import React from "react";
import stepTemplates from "../lib/stepTemplates";

function TransformStepSpecDetails({spec, updateCallback}) {
    return <>
        <div className="step-spec-field">
            <label className="step-spec-field-label" htmlFor={`transform-${spec.id}`}>Transform</label>
            <select
                name={`transform-${spec.id}`}
                onChange={
                    e => {
                        const newSpec = {...spec, ...stepTemplates["Transform"][e.target.value]};
                        updateCallback(newSpec);
                    }
                }
                defaultValue={"usfm2perf"}
            >
                {
                    Object.keys(stepTemplates["Transform"]).map((op, n) => <option key={n} value={op}>{op}</option>)
                }
            </select>
        </div>
        <div className="step-spec-field step-spec-field-heading">Input(s):</div>
        {
            spec.inputs.map(
                (i, n) =>
                    <div key={n} className="step-spec-field">
                        <label className="step-spec-field-label" htmlFor={`inputSource-${spec.id}-${n}`}>
                            {i.name}
                            {" ("}
                            {i.type}
                            {")"}
                        </label>
                        <input
                            name={`inputSource-${spec.id}- ${n}`}
                            onChange={
                                e => {
                                    const newSpec = {
                                        ...spec,
                                        inputs: spec.inputs.map((i, n2) => n2 === n ? {...i, source: e.target.value} : i),
                                    }
                                    updateCallback(newSpec);
                                }
                            }
                            defaultValue={spec.inputSource}
                        />
                    </div>
            )
        }
        <div className="step-spec-field step-spec-field-heading">Output(s):</div>
        {
            spec.outputs.map(
                (o, n) => <div key={n} className="step-spec-field step-spec-field-text">{`${o.name} (${o.type})`}</div>
            )
        }
    </>
}

export default TransformStepSpecDetails;