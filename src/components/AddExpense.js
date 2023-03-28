import { faIndianRupeeSign, faRefresh} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid';
import { Alert, Button, Card, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AddItemAction, ClearItemsAction, CloseAlertAction, DeleteItemAction, SetAlertAction } from '../actions';

const AddExpense = (props) => {

    const [item, setItem] = useState("");
    const [itemCost, setItemCost] = useState("");
    const [tabKey, setTabKey] = useState('equally');

    const AddItem = (e) => {
        e.preventDefault();
        if(null==item || item==="") {
            props.dispatch(
				SetAlertAction({
					showAlert: true,
    				alertMessage: "Item name can't be empty"
				})
			)
            return;
        }
        if(null==itemCost || itemCost==='' || itemCost==='0') {
            props.dispatch(
				SetAlertAction({
					showAlert: true,
    				alertMessage: "Item cost can't be zero"
				})
			)
            return;
        }
        if(tabKey === 'equally') {
            var newItem = {
                id: uuidV4(),
                name: item,
                cost: itemCost,
                sharedBy: []
            };
            props.members.forEach(member => {
                if(e.target[member.name][0].checked) {
                    newItem = {
                        ...newItem,
                        sharedBy: [...newItem.sharedBy, member.name]
                    }
                }
                e.target[member.name][0].checked = false
            })
            if(newItem.sharedBy.length === 0) {
                props.dispatch(
                    SetAlertAction({
                        showAlert: true,
                        alertMessage: "At least one member required"
                    })
                )
                return;
            }
            props.dispatch(
                AddItemAction(newItem)
            )
        }
        else if(tabKey === 'quantity') {
            props.members.forEach(member => {
                if(e.target[member.name][1].value !== '0') {
                    var newItem = {
                        id: uuidV4(),
                        name: item,
                        cost: itemCost*e.target[member.name][1].value,
                        sharedBy: [member.name]
                    }
                    props.dispatch(
                        AddItemAction(newItem)
                    )
                    e.target[member.name][1].value = 0
                }
            })
        }
        props.dispatch(CloseAlertAction())
        setItem("")
        setItemCost("")
    }

    const deleteItem = (id) => {
        props.dispatch(
            DeleteItemAction(id)
        )
    }

    return (
        <>
            {props.alert.showAlert && 
                <Alert className="alert mt-2" key='danger' onClose={() => props.dispatch(CloseAlertAction())} variant='danger' dismissible>
                    {props.alert.alertMessage}
                </Alert>
            }
            <Button className="add-expense-refresh-btn" onClick={() => props.dispatch(ClearItemsAction())}><FontAwesomeIcon icon={faRefresh}/></Button>
            <h1 className="mt-5 mb-4">Add Expense</h1>
            {props.items.map((item) => {
                return (
                    <div className='item-tile mt-3' onClick={() => deleteItem(item.id)}>
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
                        width: '100%',
                        textAlign: 'center'
                    }}
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    size="lg" 
                    type="text"
                    placeholder="Item Name"
                />
                <form onSubmit={AddItem}>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={tabKey}
                        onSelect={(k) => setTabKey(k)}
                        className="mb-3"
                        variant='pills'
                        fill
                    >
                        <Tab eventKey="equally" title="Equally">
                            <Form.Control
                                className='mx-auto mb-3'
                                style={{
                                    width: '100%',
                                    textAlign: 'center'
                                }}
                                value={itemCost}
                                onChange={(e) => setItemCost(e.target.value)}
                                size="lg" 
                                type="decimal"
                                placeholder="Item Cost"
                            />
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
                        </Tab>
                        <Tab eventKey="quantity" title="Quantity">
                            <Form.Control
                                className='mx-auto mb-3'
                                style={{
                                    width: '100%',
                                    textAlign: 'center'
                                }}
                                value={itemCost}
                                onChange={(e) => setItemCost(e.target.value)}
                                size="lg" 
                                type="text"
                                placeholder="1 Unit Cost"
                            />
                            {props.members.map((item, index) => {
                                return (
                                    <Row className='mb-2' style={{textAlign: 'left'}}>
                                        <Form.Label column xs={9}>
                                            {item.name}
                                        </Form.Label>
                                        <Col xs={3}>
                                            <Form.Control id={item.name} type="decimal" defaultValue='0' style={{textAlign: 'center'}}/>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Tab>
                    </Tabs>
                    <Button type="submit" className="mt-3">Add Item</Button>
                </form>
            </Card>
        </>
    )
}

const mapStateToProps = state => ({
    members: state.members,
    items: state.items,
    alert: state.alert
});
  
const mapDispatchToProps = dispatch => ({
    dispatch
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddExpense);