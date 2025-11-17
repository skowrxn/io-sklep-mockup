import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const Cancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <XCircle className="w-16 h-16 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl">
                        Płatność anulowana
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                        Płatność została anulowana. Możesz spróbować ponownie.
                    </p>
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

export default Cancel;
