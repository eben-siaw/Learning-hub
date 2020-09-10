import React from "react";

function InputField({
  label,
  error,
  errorMessage,
  name,
  type,
  value,
  onChange,
  required,
  iconName,
}) {
  return (
    <div className="input-group">
      <input
        type={type}
        className={error ? "error" : ""}
        name={name}
        onChange={onChange}
        value={value}
        required={required}
        id={name}
      />
      <label className={value.length > 0 ? "static" : ""} htmlFor={name}>
        {label}
      </label>
      <span className={`${iconName} icon`}></span>

      {error && (
        <div error={errorMessage} className="errorMessage">
          !
        </div>
      )}
      <div className="underline"></div>
      <style jsx>{`
        .input-group:not(:last-child) {
          margin-bottom: 30px;
        }

        .input-group input {
          border: none;
          background: none;
          width: 100%;
          font-size: 14px;
          padding: 10px 40px;
          border-bottom: 2px solid rgba(199, 199, 199, 0.4);
          text-align: left;
          color: var(--text-color);
        }

        .input-group label {
          position: absolute;
          top: 10px;
          left: 40px;
          text-align: center;
          transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          -webkit-transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          -moz-transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          -ms-transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          -o-transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: rgb(151, 151, 151);
          font-size: 14px;
          cursor: pointer;
        }

        .input-group input:focus + label,
        .input-group label.static {
          top: -10px;
          font-size: 12px;
          color: var(--color-2);
        }

        .input-group input:focus ~ .underline {
          transform-origin: right !important;
          transform: scaleX(1);
          -webkit-transform: scaleX(1);
          -moz-transform: scaleX(1);
          -ms-transform: scaleX(1);
          -o-transform: scaleX(1);
        }

        .input-group input:focus ~ .icon {
          color: var(--color-2);
        }

        .input-group .icon {
          position: absolute;
          top: 5px;
          left: 0;
          font-size: 22px;
          color: var(--text-color);
        }

        .input-group .underline {
          position: absolute;
          bottom: 0;
          left: 0;
          border-top: 2px solid var(--color-2);
          width: 100%;
          border-radius: 5px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          -ms-border-radius: 5px;
          -o-border-radius: 5px;
          transform-origin: left;
          transform: scaleX(0);
          -webkit-transform: scaleX(0);
          -moz-transform: scaleX(0);
          -ms-transform: scaleX(0);
          -o-transform: scaleX(0);
          transition: 0.3s linear;
          -webkit-transition: 0.3s linear;
          -moz-transition: 0.3s linear;
          -ms-transition: 0.3s linear;
          -o-transition: 0.3s linear;
        }
      `}</style>
    </div>
  );
}

export default InputField;
