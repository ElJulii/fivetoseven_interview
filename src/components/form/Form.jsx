import { useRef, useEffect, useState } from "react"
import Styles from "./form.module.css"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
    name: yup.string().required("Введите имя"),
    phone: yup.string()
        .required("Введите телефон")
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Введите корректный номер"),
    mail: yup.string().email("Введите правильный e-mail").required("Введите e-mail"),
    box: yup.boolean().oneOf([true], "Выберите ответ")
})

export default function Form( { isOpen, setIsOpen } ) {

    const { register, handleSubmit, reset, formState: {errors }, setValue, getValues} = useForm({
        resolver: yupResolver(schema)
    })

    const [ phone, setPhone ] = useState("")

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, "")
        const match = digits.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)
        if (!match) return value
        let formatted = "+"

        if (match[1]) formatted += match[1]
        if (match[2]) formatted += ` (${match[2]}`
        if (match[2] && match[2].length === 3) formatted += ")"
        if (match[3]) formatted += ` ${match[3]}`
        if (match[4]) formatted += `-${match[4]}`
        if (match[5]) formatted += `-${match[5]}`

        return formatted
    }

    const handlePhoneChange = (e) => {
        const formatted = formatPhone(e.target.value)
        setPhone(formatted)
        setValue("phone", formatted)
    }

    const onSubmit = (data) => {
        console.log(data)
        setIsOpen(false)
        alert("The data has been submitted!")
        reset()
        setPhone("")
    }

    const dialogRef = useRef(null)
    
    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [isOpen])

    return (
        <dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <form className={Styles.dialog__form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2>СВЯЗАТЬСЯ С НАМИ</h2>
                <label>
                    <input className={Styles.inp__txt} id="name" name="name" type="text" placeholder="Имя" {...register("name")}/>
                </label>
                {errors.name && <span className={Styles.error}>{errors.name.message}</span>}

                <label>
                    <input className={Styles.inp__txt} id="phone" name="phone" type="text" placeholder="Телефон"  value={phone} {...register("phone")} onChange={handlePhoneChange}/>
                </label>
                {errors.phone && <span className={Styles.error}>{errors.phone.message}</span>}

                <label>
                    <input className={Styles.inp__txt} id="mail" name="mail" type="text" placeholder="E-mail"  {...register("mail")}/>
                </label>
                {errors.mail && <span className={Styles.error}>{errors.mail.message}</span>}

                <div>
                    <input className={Styles.box__input} id="box" name="box" type="checkbox" {...register("box")}/>
                    <label className={Styles.box__label} htmlFor="box">
                        Я СОГЛАСЕН (-А) НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ
                    </label>
                </div>
                {errors.box && <span className={Styles.error}>{errors.box.message}</span>}

                <button type="submit" className={Styles.button__send}>
                    Отправить
                </button>
                <button type="button" className={Styles.button__close} onClick={() => setIsOpen(false)}>
                    ✕  
                </button>
            </form>
        </dialog>
    )
}