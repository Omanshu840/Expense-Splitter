import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import { connect } from 'react-redux'
import { AddMemberAction } from '../actions'

const AddMembers = (props) => {
	const [member, setMember] = useState("");
	
	const addMember = (dispatch) => {
		var id = props.members.length + 1;
		dispatch(
			AddMemberAction({ id: id, name: member})
		);
		setMember("")
	}

  return (
	<>
		<h1 className="mt-5 mb-4">Add Members</h1>
		{props.members.map((item, index) => {
			return (
				<p className="member-tile mt-3" key={index}>{item.name}</p>
			)
		})}
		<InputGroup className="add-member mb-3 mx-auto mt-4">
			<Form.Control
				style={{
					textAlign: 'center'
				}}
				value={member}
				onChange={(e) => setMember(e.target.value)}
				size="lg" 
				type="text"
				placeholder="Add Member"
			/>
			<InputGroup.Text onClick={(e) => addMember(props.dispatch)}>
				<FontAwesomeIcon 
					icon={faPlusCircle}
					className="fa-2xl"
				/>
			</InputGroup.Text>
      	</InputGroup>
	</>
  )
}

const mapStateToProps = state => ({
  members: state.members
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMembers);