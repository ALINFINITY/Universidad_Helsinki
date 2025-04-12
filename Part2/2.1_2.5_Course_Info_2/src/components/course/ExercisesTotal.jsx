export const ExercisesTotal = ({parts}) =>{
    let total = 0;
    parts.map(part=>total = part.exercises + total)

    return(
        <h4>Total: {total} exercises</h4>
    )
}