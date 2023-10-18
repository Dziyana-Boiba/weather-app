import './error.scss';

export const ErrorMessage = () => {
  return (
    <div className='error'>
      <span>Oops... Looks like the weather forecast got lost in the clouds.</span>
      <span>Please check your connection and try again later.</span>
      <span>In the meantime, imagine your ideal weather and it might just come true!</span>
    </div>
  );
};
