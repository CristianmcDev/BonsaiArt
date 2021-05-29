export const required = (value) => {
    return value !== null && value.length > 0}



export const emailvalidate = (email) => {
        if (String(email) === ""){
            return true
        }
        const expression = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
        return expression.test(String(email).toLowerCase())
    }

export const tlfValidate = (tlf)=>{
    return tlf.length > 8
}

export const dniValidate = (value)=>{
    return value.length > 0
    // let DNI_REGEX = /^(\d{8})([A-Z]?)$/;
    //  return value.match( DNI_REGEX );
}


export const validate = (function_list, value) => {
    // console.log(function_list)
    for (var i = 0; i < function_list.length; i++) {
        if (
            (function_list[i] === 'required' && !required(value)) ||
            (function_list[i] === 'emailvalidate' && !emailvalidate(value)) ||
            (function_list[i] === 'tlfValidate' && !tlfValidate(value)) ||
            (function_list[i] === 'dniValidate' && !dniValidate(value))
           ){
            return false
        }
    }
    return true
}
