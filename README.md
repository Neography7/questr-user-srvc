# QUESTR - Anonymous Q&A Application

<p align="center">
  <img src="https://i.imgur.com/KAhUMk0.png" alt="Logo" width="500" />
</p>

This repository contains the user microservice portion of the Questr Q&A application.

## QUESTR - All Repositories

- [Frontend](https://github.com/Neography7/questr-front)
- [API Gateway](https://github.com/Neography7/questr-gateway)
- [User Microservice](https://github.com/Neography7/questr-user-srvc)
- [Auth Microservice](https://github.com/Neography7/questr-auth-srvc)
- [Question Microservice](https://github.com/Neography7/questr-question-srvc)
- [GRPC Protos](https://github.com/Neography7/questr-proto)
- [Deployment](https://github.com/Neography7/questr-deployment)

## Description

The user microservice, developed using Nest.js, manages and provides membership operations within the platform. It supports fundamental membership procedures such as user registration, user validation, and profile management, utilizing MongoDB for data storage.

This microservice communicates with the api-gateway and other services via GRPC. Requests and data exchanges related to users are facilitated through this service.

## Backend Technologies

- **Nest.js:** Employed for developing the microservice architecture.
- **MongoDB:** Utilized for database storage.
- **TypeORM:** Used as an ORM for database interactions.
- **gRPC:** Used for communication between microservices.
- **i18next:** Used for internationalization (i18n) support.
- **class-validator:** Used for validation within Nest.js.
- **class-transformer:** Used for object transformation within Nest.js.
- **AWS S3:** Utilized for managing and storing user avatars.

## Installing

Note: Please don't forget to use this service with api-gateway and question and auth microservices.

First setup the env file. If you want to use user avatars you must use AWS S3.

```env
NODE_ENV=development

S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_REGION=
S3_BUCKET=

MONGODB_URL=
```

And then, install the packages. This service will run on port 5002.

```bash
# Install required packages
npm install
```

Lastly start the service.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

This project is licensed under the [Beerware License](LICENSE).

If you find this project useful and we ever meet, you might consider buying me a beer in return.

## Contact

If you have any questions or feedback regarding the project, feel free to get in touch:

- Email: ilkerakyel97@gmail.com
- LinkedIn: [İlker Akyel](https://www.linkedin.com/in/ilker-akyel/)
- Website: [ilkerakyel.com](https://www.ilkerakyel.com)