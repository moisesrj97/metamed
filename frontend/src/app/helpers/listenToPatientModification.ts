import { UserStore } from '../models/interfaces';
import { loginUser } from '../services/store/actions/user.actions';

export function listenToPatientModification(that: any, token: string) {
  that.socket
    .listenToPatientListModification()
    .subscribe(
      (socketData: {
        professionalId: string;
        patientId: string;
        mode: string;
      }) => {
        if (socketData.patientId === that.userInfo._id) {
          that.authService
            .loginWithToken(token)
            .subscribe((loginData: UserStore): void => {
              that.userInfo = loginData;
              that.store.dispatch(loginUser({ userInfo: { ...loginData } }));
            });
          if (socketData.mode === 'add') {
            that.socket.connectToRoom([
              socketData.professionalId + socketData.patientId,
            ]);
          }
        }
      }
    );
}
