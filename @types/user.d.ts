interface UserInterface {
    id:? number;
    email: string;
    name: string;
    phone: string;
    photo: any;
    position: string;
    position_id?: number;
    registration_timestamp?: number;
}

interface Status {
    disabled: boolean,
    success: boolean,
    error: string
}



