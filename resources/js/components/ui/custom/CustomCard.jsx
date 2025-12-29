import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

/**
 * CustomCard - Card dengan design system Digital Arsip
 * 
 * @param {Object} props
 * @param {string} props.title - Judul card (opsional)
 * @param {string} props.description - Deskripsi card (opsional)
 * @param {React.ReactNode} props.children - Konten card
 * @param {React.ReactNode} props.footer - Footer card (opsional)
 * @param {string} props.className - Class tambahan
 * 
 * @example
 * <CustomCard title="Data Arsip" description="Total arsip yang tersimpan">
 *   <p>1,234 dokumen</p>
 * </CustomCard>
 */
export function CustomCard({
    title,
    description,
    children,
    footer,
    className = '',
    ...props
}) {
    return (
        <Card
            className={`shadow-none bg-white rounded-lg border border-neutral-200 hover:shadow-md transition-all duration-200 ${className}`}
            {...props}
        >
            {(title || description) && (
                <CardHeader>
                    {title && <CardTitle className="text-neutral-900">{title}</CardTitle>}
                    {description && <CardDescription className="text-neutral-600">{description}</CardDescription>}
                </CardHeader>
            )}

            <CardContent className="pt-4">
                {children}
            </CardContent>

            {footer && (
                <CardFooter className="border-t border-neutral-100 pt-4">
                    {footer}
                </CardFooter>
            )}
        </Card>
    );
}
