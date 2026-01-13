export type Vehicle = {
    type: VehicleType
    category: VehicleCategory
    features: Array<string> | null
    capacity: number
    image: string | null
}