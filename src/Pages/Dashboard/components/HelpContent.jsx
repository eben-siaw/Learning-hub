import React from "react";

export default function HelpContent() {
  return (
    <div className="help-content">
      <h1> How can I join a course? </h1>
      <span>
        You can join a course with the meeting id created by your instructor,  
        after joining you will be redirected to the Course hub page.
        <br />
        your instructor will give you an id to join a course. After you join you
        can see the current stream created by your instructor.
      </span>

      <h1> How can I create a course? </h1>

      <span>
        You can create a course as an Instructor by clicking on the Create a
        Course button at the Dashboard <br />
      </span>

      <h1> How can I see my courses as an Instructor? </h1>

      <span>
        You can see your courses you created by going to the <br />
        Instructor hub page
      </span>
      <style jsx>{`
        .help-content {
          padding: 10px;
          color: #fff;
        }

        .help-content h1 {
          font-weight: "100";
          font-size: 18px;
          line-height: 25px;
        }
        .help-content h1:not(:first-child) {
          margin-top: 20px;
        }

        .help-content span {
          color: #ffffff9a;
        }
      `}</style>
    </div>
  );
}
