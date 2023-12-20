import { useState, useEffect, useContext, useRef, createContext } from "react";
import { Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import { createRoot } from 'react-dom/client';
import { zipCodeMask } from "@/helpers/validacao";
import axios from "axios";
import { toast } from "react-toastify";
import { ContextHelper } from "@/helpers/contexts";
import Image from "next/image";
import boleto from "../../../public/boleto.png";
import paypal from "../../../public/paypal.png";
import mercado_pago from "../../../public/mercado-pago.png"
import pix from "../../../public/pix.png";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toBRLCurrency } from "../Editor/control";
import { v4 as uuidv4 } from 'uuid';
import ReactDOM from 'react-dom';
import MercadoPago from "./MercadoPago";


export function showAprovedPayment(codigo_pagamento) {
    const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO, {
        locale: "pt-BR",
    });

    const bricksBuilder = mp.bricks();
    const renderStatusScreenBrick = async (bricksBuilder) => {
        const settings = {
            initialization: {
                paymentId: codigo_pagamento, // Payment identifier, from which the status will be checked
            },
            customization: {
                visual: {
                    hideStatusDetails: true,
                    hideTransactionDate: true,
                    style: {
                        theme: 'bootstrap', // 'default' | 'dark' | 'bootstrap' | 'flat'
                    }
                },
                backUrls: {
                    'error': 'http://localhost:3005/finalizar',
                    'return': 'http://localhost:3005/'
                }
            },
            callbacks: {
                onReady: () => {
                    const s = document.getElementsByClassName("svelte-1dfe9c6")
                    //s.remove()
                },
                onError: (error) => {
                    // Callback called for all Brick error cases
                },
            },
        };
        window.statusScreenBrickController = await bricksBuilder.create('statusScreen', 'statusScreenBrick_container', settings);
    };

    renderStatusScreenBrick(bricksBuilder);


}