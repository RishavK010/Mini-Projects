import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useSpring, animated } from "@react-spring/web";
import "react-circular-progressbar/dist/styles.css";
import "./TodoHeader.css";

export default function TodoHeader({ completedTasks, totalTasks }) {
    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    const animatedProgress = useSpring({
        value: progressPercentage,
        from: { value: 0 },
        config: { tension: 170, friction: 20 },
    });

    return (
        <div className="todo-header">
            <h3 className="todo-stats">Completed:</h3>
            <div className="progress-container">
            <animated.div className="circular-progress-bar">
                <CircularProgressbar
                    value={animatedProgress.value.to(val => val)}
                    text={`${completedTasks}/${totalTasks}`}
                    styles={buildStyles({
                        pathColor: `rgba(76, 175, 80, ${progressPercentage / 100})`,
                        textColor: "black",
                        trailColor: "#4caf50",
                    })}
                />
            </animated.div>
            </div>
        </div>
    );
}