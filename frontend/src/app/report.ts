import { LatLngExpression } from "leaflet";

export class Report {
    title: string 
    status: string 
    info: string 
    image_url: string
    location: Location 

    constructor(title: string, status: string, info: string, image_url: string, location: Location) {
        this.title = title 
        this.status = status 
        this.info = info 
        this.image_url = image_url 
        this.location = location
    }
}