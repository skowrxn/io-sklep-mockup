import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PaymentButtonProps {
    productName: string;
    price: number;
    quantity?: number;
}

export const PaymentButton = ({
    productName,
    price,
    quantity = 1,
}: PaymentButtonProps) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handlePayment = async () => {
        setLoading(true);

        try {
            // Use configured backend base URL (Vite exposes VITE_ prefixed envs to the client)
            const apiBase =
                (import.meta.env.VITE_API_BASE as string) ||
                "http://localhost:3001";
            const endpoint = `${apiBase}/create-checkout-session`;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productName,
                    price,
                    quantity,
                }),
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Server error: ${response.status} ${errText}`);
            }

            const data = await response.json();

            if (data?.url) {
                // redirect browser to Stripe Checkout (hosted by Stripe)
                window.location.href = data.url;
                return;
            }

            throw new Error("No checkout URL received from server");
        } catch (error) {
            toast({
                title: "Błąd płatności",
                description:
                    "Nie udało się utworzyć sesji płatności. Spróbuj ponownie.",
                variant: "destructive",
            });
            console.error("Payment error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-black text-white py-3.5 text-sm font-semibold hover:bg-neutral-900 hover:shadow-md transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? "Przekierowywanie..." : "Kup teraz"}
        </button>
    );
};
