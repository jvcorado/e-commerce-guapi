import { stripe } from "@/lib/stripe"
import prisma from "@/lib/prisma"
import { ProductType } from "@/types/productType"
import { auth } from "@clerk/nextjs/server"


const calculateOrderTotal = (items: ProductType[]) => {
    const total = items.reduce((accumulator, item) => {
        return accumulator + (item.price! * item.quantity!)
    }, 0)
    return total
}


export async function POST(req: Request) {
    const { userId } = auth()
    const { items, payment_intent_id } = await req.json()


    console.log('item', items)
    console.log('paymnet', payment_intent_id)

    if (!userId) {
        return new Response("Unauthorized", { status: 401 })
    }

    const total = calculateOrderTotal(items)

    const orderData = {
        user: { connect: { id: 1 } },  // Use parseInt to ensure userId is a number
        amount: total,
        currency: 'brl',
        status: 'pending',
        /*  createdDate: new Date().toISOString(), */
        paymentIntentID: payment_intent_id,
        products: {
            create: items.map((item: ProductType) => ({
                name: item.name,
                description: item.description,
                price: item.price,
                image: item.image,
                quantity: item.quantity
            }))
        }
    }

    if (payment_intent_id) {
        const currentIntent = await stripe.paymentIntents.retrieve(payment_intent_id)

        if (currentIntent) {
            const updatedIntent = await stripe.paymentIntents.update(payment_intent_id, { amount: total })

            const [existingOrder, updatedOrder] = await Promise.all([
                prisma.order.findFirst({
                    where: { paymentIntentID: payment_intent_id },
                    include: { products: true }
                }),

                prisma.order.update({
                    where: { paymentIntentID: payment_intent_id },
                    data: {
                        amount: total,
                        products: {
                            deleteMany: {},
                            create: items.map((item: ProductType) => ({
                                name: item.name,
                                description: item.description,
                                price: item.price,
                                image: item.image,
                                quantity: item.quantity
                            }))
                        }
                    }
                })
            ])

            if (!existingOrder) {
                return new Response("Order not found", { status: 404 })
            }

            return new Response(JSON.stringify({ paymentIntent: updatedIntent }), { status: 200 })
        }
    } else {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderTotal(items),
            currency: 'brl',
            automatic_payment_methods: { enabled: true }
        });

        orderData.paymentIntentID = paymentIntent.id




        const newOrder = await prisma.order.create({
            data: orderData
        })

        return new Response(JSON.stringify({ paymentIntent }), { status: 200 })
    }
}