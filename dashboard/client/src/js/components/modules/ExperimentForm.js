import React from 'react';


function getError(errors, key) {
    if (errors && errors[key]) {
        return <span className="help is-danger">{errors[key]}</span>;
    }

    return <span className="help is-danger">&nbsp;</span>;
}


export default function ExperimentForm(props) {
    return (
        <form onSubmit={props.onFormSubmit}>
            <label className="label">Experiment Name</label>
            <div className="control">
                <input
                    type="text"
                    name="name"
                    value={props.experiment.name || ''}
                    onChange={props.onExperimentInfoChange}
                    placeholder="My test experiment"
                    className="input"
                />
                {getError(props.validationErrors, 'name')}
            </div>

            <label className="label">Experiment Exposure (In %)</label>
            <div className="control">
                <input
                    type="text"
                    name="exposure"
                    value={props.experiment.exposure || ''}
                    onChange={props.onExperimentInfoChange}
                    placeholder="50"
                    className="input"
                />
                {getError(props.validationErrors, 'exposure')}
            </div>

            <div className="control is-grouped">
                <div className="control">
                    <button
                        type="submit"
                        className="button is-primary"
                    >
                        Save
                    </button>
                </div>
                <div className="control">
                    <button
                        type="button"
                        className="button"
                        onClick={props.onFormCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
}
