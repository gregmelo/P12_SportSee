import PropTypes from "prop-types";

export default function CustomizedTooltip({ active, payload, numberOfValues }) {
    if (active && payload && payload.length) {
        return (
            <div className="customized-tooltip">
            {numberOfValues === 2 ? (
                <>
                <p>{`${payload[0].value} kg`}</p>
                <p>{`${payload[1].value} kCal`}</p>
                </>
             ) : (
                <>
                    <p>{`${payload[0].value} min`}</p>
                </>
             )}
                </div>
        )
    }
}

CustomizedTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
    label: PropTypes.string,
    numberOfValues: PropTypes.number,
}