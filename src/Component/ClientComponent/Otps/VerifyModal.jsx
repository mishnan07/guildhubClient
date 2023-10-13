import React, {useEffect, useRef, useState} from "react";
import { Toaster } from "react-hot-toast";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../../../firbase/firbase.config";
// import { showAlertError,showAlertSuccess } from '../../service/showAlert';
// import{useDispatch} from "react-redux"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const VerifyModal = ({ mobile, phoneno }) => {
  // firebase
//   const dispatch = useDispatch();
  const [otp, setotp] = useState("");
  const auth = getAuth(app);
  const [screen, setscreen] = useState(false);
  const [resent, setresent] = useState(false)
  const [OtpInput, setOtpInput] = useState(true)

  //   firebase
  const handleSendOtp = () => {
  setOtpInput(true)
    setresent(false)
   if(!window.recaptchaVerifier){
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: () => {
          console.log("recaptcha resolved..");
        },
      },
      auth
    );
   }
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, "+91" + phoneno, appVerifier)
      .then((confirmationResult) => {
        toast.success("OTP sent to your phone number. Please Verify");
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        const appVerifier = window.recaptchaVerifier;
        const ss = appVerifier.widgetId;
        console.log(appVerifier);
        toast.error("something went wrong: otp not sent:  " + error);
        // window.recaptchaVerifier.render().then(function(ss) {
        //   grecaptcha.reset(ss);
        // });
      });
  };

  // .....end of firebase

  const confirmation = () => {
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user.phoneNumber);
        const modalCheckbox = document.getElementById("my_modal_6");
        modalCheckbox.checked = false;
// showAlertSuccess(dispatch,"otp verified")
toast.success('OTP verified successfully');
        mobile(true);
      })
      .catch((error) => {
        alert(error);
        toast.error('Otp verify error')
      });
  };
  //  time intervall

  const [seconds, setSeconds] = useState(20);
  const countdownIntervalRef = useRef(null);
  useEffect(() => {
    if (screen) {
      setSeconds(20);
      if (seconds > 0) {
        const decrementSeconds = () => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        };
        countdownIntervalRef.current = setInterval(decrementSeconds, 1000);
      }

      return () => clearInterval(countdownIntervalRef.current);
    }
  }, [screen,resent]);

  useEffect(() => {
    if (seconds <= 0) {
      setresent(true);
      setOtpInput(false)
      clearInterval(countdownIntervalRef.current);
    }
  }, [seconds]);

  return (
    <>
        <ToastContainer />
      <div id="sign-in-button"></div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box ">
          {/* first section */}
          {screen ? (
            <div className=" flex-1 gap-2 ">
              <input
                type="number"
                onChange={(e) => {
                  setotp(e.target.value);
                }}
                className="input mx-2 input-bordered w-full max-w-xs"
                placeholder="enter otp*"
                disabled={!OtpInput} // Disable the input when OtpInput is false
              />
              <button onClick={confirmation} className="btn ">
                {" "}
                Submit Otp*
              </button>
              {resent?(<button className="btn btn-ghost "  onClick={() => {
                   
                    handleSendOtp();
                  }} > Re Sent</button>):""}
              {OtpInput?(<div><span className="loading loading-dots mx-1 loading-sm"></span>
              <span className='text-center  mx-2'>  0:{seconds}</span></div>):null }
            </div>
          ) : (
            <div className="  ">
              <div className="border text-center border-5 border-primary p-5 border-dotted m-auto">
                Phone no: {phoneno}
              </div>
              <div className="  p-5 text-center">
                <button
                  className="btn btn-wide"
                  onClick={() => {
                    setscreen(true);
                    handleSendOtp();
                    // setOtpInput(true)
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          <div className="modal-action">
            <label
              onClick={() => {
                setscreen(false);
                
              }}
              htmlFor="my_modal_6"
              className="btn"
            >
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyModal;