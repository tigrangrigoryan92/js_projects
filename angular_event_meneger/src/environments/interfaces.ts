export interface Event {
    id?: number;
    name: string;
    eventType: number;
    description: string;
    date: string;
    image?: string;
    created?: boolean;
}

export interface EventType {
    value: number;
    type: string;
}
