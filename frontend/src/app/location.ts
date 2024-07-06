import { LatLngExpression } from "leaflet"

export class Location {
    name: string 
    coordinates: LatLngExpression

    constructor(name: string, coordinates: LatLngExpression) {
        this.name = name 
        this.coordinates = coordinates
    }
}