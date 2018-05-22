import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {IMedia, MediaService} from './media.service';

describe('media/media.service', () => {
  describe('updatePathIfLocalStorage()', () => {
    const initialApiUrlValue = environment.apiUrl;
    beforeEach(() => environment.apiUrl = 'http://google.fr/');
    afterEach(() => environment.apiUrl = initialApiUrlValue);

    const service = new MediaService({} as HttpClient);

    it('Should process relative(=local) URL', () => {
      const media: IMedia = {
        path: '/UUID/FILENAME.png',
        thumbnails: {
          small: '/UUID/FILENAME-small.png',
          medium: 'UUID/FILENAME-medium.png', // doesn't start with "/"
        }
      } as IMedia;

      service._updatePathIfLocalStorage(media);

      expect(media.path).toEqual('http://google.fr/media/raw/UUID/FILENAME.png');
      expect(media.thumbnails.small).toEqual('http://google.fr/media/raw/UUID/FILENAME-small.png');
      expect(media.thumbnails.medium).toEqual('http://google.fr/media/raw/UUID/FILENAME-medium.png');
    });

    it('Should not process full URL', () => {
      const url = 'https://storage.REGION.cloud.ovh.net/v1/AUTH_TOKEN/CONTAINER/UUID/FILENAME.png';

      const media: IMedia = {path: url} as IMedia;

      service._updatePathIfLocalStorage(media);

      expect(media.path).toEqual(url);
    });
  });
});
