import siiimpleToast from 'siiimple-toast'
export function notificationShow(msg,type){

        const Notification = new siiimpleToast({
            vertical: 'bottom',
            horizontal: 'right'
        });
        switch(type){
            case 0:
                Notification.message(msg);
            break
            case 1:
                Notification.success(msg);
            break;
            case 2:
                Notification.alert(msg);
            break;
            default:
                Notification.message(msg);

        }
        
}
export function isNumeric(num) {
    return /^\d+$/.test(num);
}