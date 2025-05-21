"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">{children}</CardContent>
            <Separator className="bg-gray-500/50 max-w-[80vw] mx-auto" />
        </Card>
    )
}