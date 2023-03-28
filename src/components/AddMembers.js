import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid';
import {Alert, Form, InputGroup} from 'react-bootstrap'
import { connect } from 'react-redux'
import { AddMemberAction, CloseAlertAction, DeleteMember, SetAlertAction } from '../actions'

const AddMembers = (props) => {
	const [member, setMember] = useState("");
	
	const addMember = (dispatch) => {
		if(null==member || member==="") {
			dispatch(
				SetAlertAction({
					showAlert: true,
    				alertMessage: "Member name can't be empty"
				})
			)
		}
		else {
			var id = uuidV4();
			dispatch(
				AddMemberAction({ id: id, name: member})
			);
			setMember("")
		}
	}

	const onMemberNameChange = (value) => {
		setMember(value)
		if(null!=value && value!=="") {
			props.dispatch(CloseAlertAction())
		}
	}

  return (
	<>
		{props.alert.showAlert && 
			<Alert className="alert mt-2" key='danger' onClose={() => props.dispatch(CloseAlertAction())} variant='danger' dismissible>
          		{props.alert.alertMessage}
        	</Alert>
		}
		<h1 className="mt-5 mb-4">Add Members</h1>
		{props.members.map((item, index) => {
			return (
				<p className="member-tile mt-3" key={index} onClick={() => {props.dispatch(DeleteMember(item.id))}}>{item.name}</p>
			)
		})}
		<InputGroup className="add-member mb-3 mx-auto mt-4">
			<Form.Control
				style={{
					textAlign: 'center',
					backgroundColor: 'var(--baseColor)',
					color: 'var(--secColor1)'
				}}
				value={member}
				onChange={(e) => onMemberNameChange(e.target.value)}
				size="lg" 
				type="text"
				placeholder="Add Member"
			/>
			<InputGroup.Text onClick={(e) => addMember(props.dispatch)}>
				<FontAwesomeIcon 
					icon={faPlusCircle}
					className="fa-2xl"
					style={{color: 'var(--secColor1)'}}
				/>
			</InputGroup.Text>
      	</InputGroup>
	</>
  )
}

const mapStateToProps = state => ({
  members: state.members,
  alert: state.alert
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMembers);