import  { useContext, useEffect } from 'react';
import '../../css/Forms/transfer.css'; 
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginContext } from '../../Contexts/LoginContext';
import { Axios } from '../AxiosReqestBuilder';
import { UserContext } from '../../Contexts/UserContext';
import Swal from 'sweetalert2';

const TransferForm = () => {
    const naviagte = useNavigate();
    const {isLogin} = useContext(LoginContext);
    const {user} = useContext(UserContext);
    
    useEffect(()=>{
        if(!isLogin){
          naviagte("/login");
        }
    },[naviagte, isLogin])

    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        
        const formData = new FormData();
        if(data.files){
            formData.append('files', data.files[0]);
          }

        Object.keys(data).forEach((key)=>{
            if( key != "files" ){
              formData.append(key, data[key]);
            }
          })

        console.log(formData);

        try {
            const response = await Axios.post("/auth/transferForm/add", formData );
            console.log(response.data);
            Swal.fire({
                title: 'Form Submitted',
                icon: 'success',
            })
            window.scrollTo({top:0, behavior:"smooth"})
            naviagte("/forms");
        } catch (error) {
            console.log(error);
        }

    }
    
    return (
        <div className="transferform">
            <div className="transfer-container">
                <h2>Transfer Application Form</h2>
                <form id="TransferForm" onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <p>{user.first_name}</p>
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="EmpID">UPF No:</label>
                        <p>{user.emp_id}</p>
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="designation">Designation: </label>
                        <input type="text" id='designation' {...register("designation",{required:{
                            value: true,
                            message: "Designation is required",
                        }})}/>
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="Dept">Department:</label>
                        <p>{user.department}</p>
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="Facul">Faculty:</label>
                        <p>{user.faculty}</p>
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="currentJobStartDate">Current Job Start Date:</label>
                        <input type="date" id="currentJobStartDate" name="currentJobStartDate" {...register("currentJobStartDate", {required: {
                            value: true,
                            message: "Job Start Date is required"
                        }})} />
                        {errors.currentJobStartDate && <span className='error'>{errors.currentJobStartDate.message}</span>}
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="currentJobEndDate">Current Job End Date:</label>
                        <input type="date" id="currentJobEndDate" name="currentJobEndDate" {...register("currentJobEndDate", {required: {
                            value: true,
                            message: "Job Start Date is required"
                        }})} />
                        {errors.currentJobEndDate && <span className='error'>{errors.currentJobEndDate.message}</span>}
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="previousJobStartDate">Previous Job Start Date:</label>
                        <input type="date" id="previousJobStartDate" name="previousJobStartDate" {...register("previousJobStartDate")} />
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="previousJobEndDate">Previous Job End Date:</label>
                        <input type="date" id="previousJobEndDate" name="previousJobEndDate" {...register("previousJobEndDate")} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="files">Additional Documents:</label>
                        <input type="file" id="files" name="files" {...register('files')} />
                    </div>

                    <div className="btnDiv">
                        <input type="submit" className='bttn redbtn' value={"Submit"}/>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default TransferForm;
