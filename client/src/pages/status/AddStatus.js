import {useState} from 'react'

const AddStatus = ({onAdd}) => {
    const [isInStock,SetinStock] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        console.log(isInStock)
        onAdd({ isInStock})

        SetinStock(false)
    }

    return (
        <div style={{marginTop: 10, marginLeft: 10, border:null}}>
            <form className='add-status' onSubmit={onSubmit}>
                <div>
                    <label>In stock or out of stock:
                        <select value={isInStock} onChange={(e)=> SetinStock(e.target.value)}>
                            <option value="true">In stock</option>
                            <option value="false">Out of stock</option>
                            </select>
                    </label>
                </div>
                <input style={{marginTop: 10}} type='submit' value='submit'></input>
            </form>
        </div>
    )
}

export default AddStatus