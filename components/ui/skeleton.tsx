import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

function CustomSkeleton({
  columns = 6,
  row = 5,
  height = 32,
  className = ""
}) {
  return (
    <TableBody>
      {Array.from({ length: row }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="bg-gray-100">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <div
                className={cn(
                  "rounded-md bg-gray-300 w-full animate-shimmer",
                  className
                )}
                style={{ height }}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background: linear-gradient(to right, #e5e7eb 0%, #f3f4f6 20%, #e5e7eb 40%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </TableBody>
  );
}

export { Skeleton, CustomSkeleton }
