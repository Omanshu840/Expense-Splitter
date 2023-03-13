import { faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AddItemAction } from '../actions';

const AddExpense = (props) => {

    const [item, setItem] = useState("");
    const [itemCost, setItemCost] = useState("");

    const AddItem = (e) => {
        e.preventDefault();
        var newItem = {
            name: item,
            cost: itemCost,
            sharedBy: []
        };
        props.members.forEach(member => {
            if(e.target[member.name].checked) {
                newItem = {
                    ...newItem,
                    sharedBy: [...newItem.sharedBy, member.name]
                }
            }
        })
        props.dispatch(
            AddItemAction(newItem)
        )
        setItem("")
        setItemCost("")
    }

    return (
        <>
            <h1 className="mt-5 mb-4">Add Expense</h1>
            {props.items.map((item) => {
                return (
                    <div className='item-tile mt-3'>
                        <div className='item'>
                            {item.name} - <FontAwesomeIcon icon={faIndianRupeeSign}/>{item.cost}
                        </div>
                        <div>
                            {item.sharedBy.map((member, index) => {
                                return (
                                    <>{index!==0 ? <>, {member}</> : <>{member}</>}</>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
            <Card className="mx-auto add-expense-tile mt-4">
                <Form.Control
                    className='mx-auto mb-3'
                    style={{
                        width: '80%',
                        textAlign: 'center'
                    }}
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    size="lg" 
                    type="text"
                    placeholder="Item Name"
                />
                <Form.Control
                    className='mx-auto mb-3'
                    style={{
                        width: '80%',
                        textAlign: 'center'
                    }}
                    value={itemCost}
                    onChange={(e) => setItemCost(e.target.value)}
                    size="lg" 
                    type="text"
                    placeholder="Item Cost"
                />
                <form onSubmit={AddItem}>
                    <div className='checkboxes'>
                        {props.members.map((item, index) => {
                            return (
                                <Form.Check 
                                    id={item.name}
                                    type="checkbox"
                                    label={item.name}
                                    style={{width: '35%'}}
                                    className="mx-auto"
                                />
                            )
                        })}
                    </div>
                    <Button type="submit" className="mt-3">Add Item</Button>
                </form>
            </Card>
        </>
    )
}

const mapStateToProps = state => ({
    members: state.members,
    items: state.items
});
  
const mapDispatchToProps = dispatch => ({
    dispatch
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddExpense);