"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function FormSection({ title, children, editing = false, classname = "" }: { title: string; children: React.ReactNode; editing?: boolean; classname?: string }) {
    return (
        <Card className={`border-0 shadow-none bg-transparent ${classname}`}>
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
            </CardHeader>
            <CardContent className={`grid grid-cols-1 sm:grid-cols-2 ${editing ? "lg:grid-cols-4" : "lg:grid-cols-3"}  gap-7`}>{children}</CardContent>
            <Separator className="bg-gray-300/50 max-w-[80vw] mx-auto" />
        </Card>
    )
}