//import { Payment } from '@mercadopago/sdk-react';
import { useEffect } from 'react';
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { resolve } from 'styled-jsx/css';
import { ContextHelper } from '@/helpers/contexts';
import { useContext } from 'react';
import axios from 'axios';

await loadMercadoPago();

export const clearElement = () => {
    window.cardPaymentBrickController.unmount()
}

export default function MercadoPago() {

    return (
        <>
            <div id="mp_container">
                <div id="cardPaymentBrick_container" ></div>
            </div>
        </>
    )
}