import Swal from 'sweetalert2'
import * as moment from 'moment';
import 'moment/locale/es';

moment.locale('es');
// import "../conversat

export function capitalizeFirstLetter(text) {
    if (!text) {
        return text;
    }
    if (typeof(text) !== 'string') {
        return JSON.stringify(text);
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function showAlert(title, message, type) {
    Swal.fire({
        title: title,
        text: message,
        type: type,
        showCancelButton: false,
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonStyling: false
    })
}
export function get_badge_color(tag) {
    if (!tag) {
        return tag
    }
    if (typeof(tag) !== 'string') {
        return 'dark-lighten'
    }
    switch (tag.toLowerCase()) {
        case 'nuevo':
            return 'warning-lighten'
        case 'enviado':
        case 'completado':
            return 'success-lighten'
        case 'entregado':
        case 'cancelado':
        case 'error de pago':
        case 'anulado':
        case 'devolución':
            return 'danger-lighten'
        case 'Entregado':
            return 'success-lighten'
        case 'Enviado':
            return 'success-lighten'
        case 'Cancelado':
            return 'danger-lighten'
        case 'Error de pago':
            return 'dark-lighten'
        default:
            return 'dark-lighten'
    }

}


export function isoToHour(date) {
    let parsed_date = moment(date);
    if (!parsed_date.isSame(new Date(), "year")) {
        return parsed_date.format("DD [de] MMMM [de] YYYY, HH:mm")
    }
    if (!parsed_date.isSame(new Date(), "month")) {
        return parsed_date.format("DD [de] MMMM, HH:mm")
    }
    if (!parsed_date.isSame(new Date(), "day")) {
        return parsed_date.format("DD [de] MMMM, HH:mm")
    }

    return parsed_date.format("HH:mm")
}


export function get_conv_last_id(conversation, type) {
    console.log(conversation)
    for (var i = conversation.length - 1; i > 0; i--) {
        if (conversation[i].speaker === type) {
            return conversation[i].id
        }
    }
    return null
}

export function toDate(date) {
    if (date === null) {
        return ''
    }
    if (typeof(date) === "string") {
        try {
            return new Date(date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        } catch (e) {
            try {
                return new Date(date)
            } catch (e) {
                void(0);
            }
        }
    }
    // console.log("DATE!", date)
    return date
}

export function confirmAlert(title, message, type, callbackSuccess) {
    Swal.fire({
        title: title,
        text: message,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#623966',
        cancelButtonColor: '#d33000',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            callbackSuccess()
        }
    })
}

export function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = window.location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName)
            result = decodeURIComponent(tmp[1]);
        }
    return result;
}

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    if (!bytes)
        return bytes;
    if (typeof(bytes)!=='number')
        return;
    const k = 1024;
    const dm = decimals < 0
        ? 0
        : decimals;
    const sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB'
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Function to download data to a file
export function downloadFile(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

export function getTagClass(tag) {
  if (!tag) {
      return tag
  }
  if (typeof(tag) !== 'string') {
      return 'badge badge-secondary'
  }
    switch (tag.toLowerCase()) {
        case "psicológico":
            return "badge badge-success"
        case "social":
            return "badge badge-primary"
        case "centro Médico":
            return "badge badge-info"
        case "jurídico":
            return "badge badge-warning text-white"
        case "policia nacional":
            return "badge badge-danger"
        case "policia local":
            return "badge badge-danger"
        default:
            return "badge badge-secondary"
    }

}

export function getStateClass(status) {
  if (!status) {
      return status
  }
  if (typeof(status) !== 'string') {
      return 'badge badge-primary'
  }
    switch (status.toLowerCase()) {
        case "recibida":
            return "badge badge-success-lighten"
        case "en trámite":
            return "badge badge-info-lighten"
        case "no solicitada":
            return "badge badge-danger-lighten"
        case "solicitada":
            return "badge badge-info-lighten"
        default:
            return "badge badge-primary"
    }
}

export function getStateText(status) {
  if (!status) {
      return status
  }
  if (typeof(status) !== 'string') {
      return status
  }
    switch (status.toLowerCase()) {
        case "recibida":
            return "Recibida"
        case "en trámite":
            return "En trámite"
        case "no solicitada":
            return "No solicitada"
        case "rechazada":
            return "Rechazada"
        default:
            return status
    }
}

export function getTelealarmClass(telealarm) {
  if (!telealarm) {
      return telealarm
  }
  if (typeof(telealarm) !== 'string') {
      return "badge badge-primary"
  }
    switch (telealarm.toLowerCase()) {
        case "recibido":
            return "badge badge-success-lighten Recibido"
        case "no solicitado":
            return "badge badge-secondary-lighten No solicitado"
        case "pedido":
            return "badge badge-info-lighten Pedido"
        default:
            return "badge badge-primary"
    }
}

export function changeDotToComma(value){
  value = value.toString().replace(/,/g, '.');
  return parseFloat(value)
}

export function changeCommaToDot(value){
  value = value.toString().replace(/,/g, '.');
  return parseFloat(value)
}
