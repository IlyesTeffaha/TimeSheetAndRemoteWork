import { forwardRef } from 'react';
import { SnackbarContent } from 'notistack';


const NotificationTemplate = forwardRef((props, ref) => {
  const { item } = props;
  return (
    <SnackbarContent
      ref={ref}
      className="mx-auto max-w-320 w-full relative pointer-events-auto py-4"
    >
     
    </SnackbarContent>
  );
});

export default NotificationTemplate;
