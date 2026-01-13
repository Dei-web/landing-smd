import type { LucideProps } from "lucide-react"

export type Service = {
    title: string
    description: string
    image: string
    icon: React.ComponentType<LucideProps>
    features: string[]
}