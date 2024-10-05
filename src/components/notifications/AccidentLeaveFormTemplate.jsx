import "../../css/Forms/accidentLeaveFormTemplate.css"

const AccidentLeaveFormTemplate = ({application}) => {
    
  return (
    <>
    <div className="AccidentLeaveTemplate">
            <h2>{application.formType}</h2>

            {/* Common */}
            {application.user.first_name && <div className="review-row">
                <div className="review-label">Name of the applicant: </div>
                <div className="review-value">{application.user.first_name}</div>
            </div>}
            {application.user.emp_id && <div className="review-row">
                <div className="review-label">UPF No: </div>
                <div className="review-value">{application.user.emp_id}</div>
            </div>}
            {application.user.department && <div className="review-row">
                <div className="review-label">Division/Department/Unit/Center: </div>
                <div className="review-value">{application.user.department}</div>
            </div>}
            {application.user.faculty && <div className="review-row">
                <div className="review-label">Faculty/unit: </div>
                <div className="review-value">{application.user.faculty}</div>
            </div>}


            {/* Accident */}
            {application.accidentOccurredDuring && <div className="review-row">
                <div className="review-label">The accident occurred during: </div>
                <div className="review-value">{application.accidentOccurredDuring}</div>
            </div>}
            {application.dateAndTimeOfAccident && <div className="review-row">
                <div className="review-label">Date and time of the accident: </div>
                <div className="review-value">{application.dateAndTimeOfAccident?.substring(0,10)} : {application.dateAndTimeOfAccident?.substring(11,19)}</div>
            </div>}
            {application.placeOFAccident && <div className="review-row">
                <div className="review-label">PlaceOFAccident of accident: </div>
                <div className="review-value">{application.placeOFAccident}</div>
            </div>}
            {application.whilePerformingAnyDuty && <div className="review-row">
                <div className="review-label">While performing any duty: </div>
                <div className="review-value">{application.whilePerformingAnyDuty}</div>
            </div>}
            {application.natureOfDanger && <div className="review-row">
                <div className="review-label">Nature of danger: </div>
                <div className="review-value">{application.natureOfDanger}</div>
            </div>}
            {application.whoInspectTheAccident && <div className="review-row">
                <div className="review-label">Name of the nearest person / officer who will inspect the accident: </div>
                <div className="review-value">{application.whoInspectTheAccident}</div>
            </div>}
            {application.whoInformedAfterAccident && <div className="review-row">
                <div className="review-label">The officer who informed immediately after the accident was the: </div>
                <div className="review-value">{application.whoInformedAfterAccident}</div>
            </div>}
            {application.referralForTreatment && <div className="review-row">
                <div className="review-label">Referral for Treatment: </div>
                <div className="review-value">{application.referralForTreatment}</div>
            </div>}
            {application.dateAndTimeOfReport && <div className="review-row">
                <div className="review-label">Date and Time of Report to Hospital / Medical Centre: </div>
                <div className="review-value">{application.dateAndTimeOfReport?.substring(0,10)} : {application.dateAndTimeOfReport?.substring(11,19)}</div>
            </div>}
            {application.durationOfHospitalStay && <div className="review-row">
                <div className="review-label">Duration of hospital stay: </div>
                <div className="review-value">{application.durationOfHospitalStay}</div>
            </div>}
            {application.isPoliceComplaint && <div className="review-row">
                <div className="review-label">Police complaint was made: </div>
                <div className="review-value">{application.isPoliceComplaint}</div>
            </div>}
            {application.expectAccidentCompensation && <div className="review-row">
                <div className="review-label">Whether to expect accident compensation: </div>
                <div className="review-value">{application.expectAccidentCompensation}</div>
            </div>}
    

            {/* Medical */}
            {application.designation && <div className="review-row">
                <div className="review-label">Designation: </div>
                <div className="review-value">{application.designation}</div>
            </div>}
            {application.requestPeriodStart && <div className="review-row">
                <div className="review-label">Request Period Start: </div>
                <div className="review-value">{application.requestPeriodStart}</div>
            </div>}
            {application.requestPeriodEnd && <div className="review-row">
                <div className="review-label">Request Period End: </div>
                <div className="review-value">{application.requestPeriodEnd}</div>
            </div>}


            {/* Maternity */}
            {application.childBirthDate && <div className="review-row">
                <div className="review-label">Child Birth Date: </div>
                <div className="review-value">{application.childBirthDate}</div>
            </div>}


            {/* Paternal */}
            {application.requestDate && <div className="review-row">
                <div className="review-label">Request Date: </div>
                <div className="review-value">{application.requestDate}</div>
            </div>}
            
    </div>
    </>
  )
}

export default AccidentLeaveFormTemplate