export const checkboxRadio = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  value,
  name,
}) => {
  return (
    <>
    <div className='form-check'>
      <input 
        className={`form-check-input ${errors[name] && 'is-invalid'}`}
        type={type}
        name={name}
        id={id}
        value={value}
        {...register(name, rules)}
    />
    {/* Radio 使用 Name 欄位 */}
    <label className='form-check-label' htmlFor={id}>
      {labelText}
    </label>
    {errors[name] && (
      <div className='invalid-feedback'>{errors[name]?.message}</div>
    )}
    </div>
    </>
  )
};
export const Input = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
}) => {
  return (
    <>
    <label htmlFor={id} className='form-label'>
      {labelText}
    </label>
    <input 
    id={id} 
    type={type} 
    className={`form-control ${errors[id] && 'is-invalid'}`}
    {...register(id, rules)}
    />
    {errors[id] && (
      <div className='invalid-feedback'>{errors[id]?.message}</div>
    )}
    </>
  )
};
export const Textarea = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
}) => {
  return (
    <>
    <label htmlFor={id} className='form-label'>
      {labelText}
    </label>
    <textarea
    id={id} 
    type={type} 
    className={`form-control`}
    rows={`3`}
    {...register(id, rules)}
    />
    </>
  )
};
export const Select = ({
  id,
  labelText,
  register,
  errors,
  rules,
  children,
  disablad = false,
}) => {
  return (
    <>
    <label htmlFor={id} className='form-label'>
      {labelText}
    </label>
    <select>
      {children}
    </select>
    {errors[id] && (
      <div className='invalid-feedback'>{errors[id]?.message}</div>
    )}
    </>
  );
};
