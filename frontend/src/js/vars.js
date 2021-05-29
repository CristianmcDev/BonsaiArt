export var delay_bot = 500

export var loading_msg = {
    id: "Loading",
    speaker: "bot",
    type: "loading",
    data: "",
    date: "2019-10-22T09:29:28.506Z"
}

export const base_react_table_props = {
    className: "table table-striped mb-0",
    previousText: 'Anterior',
    nextText: 'Siguiente',
    loadingText: 'Cargando...',
    noDataText: 'No se han encontrado filas',
    pageText: 'Página',
    ofText: 'de',
    rowsText: 'filas',
    pageJumpText: 'ir a la página',
    rowsSelectorText: 'filas por página',
    showPageSizeOptions: false
}

export const order_status_list = [
    'Cualquier estado',
    'En espera de pago con cheque',
    'Pago aceptado',
    'Confirmación de pedido',
    'Enviado',
    'Entregado',
    'Cancelado',
    'Reembolsado',
    'Error de pago',
    'Pedido pendiente',
    'En espera de transferencia bancaria',
    'En espera de pago PayPal',
    'Pago remoto aceptado',
    'Autorización de PayPal aceptada',
    'En Proceso',
    'Authorization accepted by HiPay',
    'En espera de pago con tarjeta de crédito',
    'Pedido pendiente',
    'Waiting cod validation',
    'Authorization accepted from Braintree',
    'Awaiting for Braintree payment',
    'Rechazado',
    'Retenido'
]
