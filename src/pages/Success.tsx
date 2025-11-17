import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        console.log("Payment successful! Session ID:", sessionId);
    }, [sessionId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl">Płatność udana!</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                        Twoja płatność została pomyślnie przetworzona.
                    </p>
                    {sessionId && (
                        <p className="text-sm text-muted-foreground">
                            ID sesji: {sessionId}
                        </p>
                    )}
                    <Button
                        onClick={() => (window.location.href = "/")}
                        className="w-full"
                    >
                        Powrót do sklepu
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Success;
