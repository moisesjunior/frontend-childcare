import React from "react"

import './styles.css'

const Buttons = (props) => {
    return (
        <div className="float">
            <button type="button" onClick={props.handleClose} className="btn default">Cancelar</button>&nbsp;
            <button type="submit" className="btn success">Salvar</button>
        </div>
    )
}

export default Buttons