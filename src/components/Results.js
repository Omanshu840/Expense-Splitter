import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

const Results = (props) => {

    const [result, setResult] = useState([]);

    useEffect(() => {
        var tempResult = [];
        props.members.forEach(member => {
            var memberResult = [];
            var memberTotal = 0;
            props.items.forEach(item => {
                if(item.sharedBy.includes(member.name)) {
                    memberTotal += item.cost/item.sharedBy.length
                    var share = Math.round(((item.cost/item.sharedBy.length) + Number.EPSILON) * 100) / 100
                    memberResult = [
                        ...memberResult,
                        {
                            name: item.name,
                            cost: item.cost,
                            sharedBy: item.sharedBy.length,
                            share: share
                        } 
                    ]
                }
            })
            memberTotal = Math.round(memberTotal)
            tempResult = [
                ...tempResult,
                {
                    name: member.name,
                    result: memberResult,
                    total: memberTotal
                }
            ]
        })

        setResult(tempResult);
        localStorage.setItem('reduxState', JSON.stringify(props.state))
    }, [props.items, props.members, props.state])

    if(result.length === 0) {
        return (
            <div className="result-tile mb-3 mt-2" style={{textAlign: 'center'}}>
                No Members added
            </div>
        )
    }

    return (
        <>
            <h1 className="mt-5 mb-3">Share</h1>
            <div>
                {result.map((member, index) => {
                    return (
                        <div className="result-tile mb-3">
                            <div className='member-name'>{member.name}</div>
                            <div>
                                {member.result.map((item, index) => {
                                    return (
                                        <>
                                            {(index)!==0? <> + </> : <>= </>}{item.name}/{item.sharedBy}
                                        </>
                                    )
                                })}
                            </div>
                            <div>
                                {member.result.map((item, index) => {
                                    return (
                                        <>
                                            {(index)!==0? <> + </> : <>= </>}{item.cost}/{item.sharedBy}
                                        </>
                                    )
                                })}
                            </div>
                            <div>
                                {member.result.map((item, index) => {
                                    return (
                                        <>
                                            {(index)!==0? <> + </> : <>= </>}{item.share}
                                        </>
                                    )
                                })}
                            </div>
                            <div>
                                = {member.total}
                            </div>
                        </div>
                    )
                })}

                <p className='total mt-4'>
                    Total = <FontAwesomeIcon icon={faIndianRupeeSign}/>{result.map(item => item.total).reduce((a, b) => a+b)}
                </p>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    state: state,
    members: state.members,
    items: state.items
});
  
const mapDispatchToProps = dispatch => ({
    dispatch
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Results);