import { CRUD } from '../../common/interfaces/crud.interface'
import debug from 'debug'

const log: debug.IDebugger = debug("app:terms-service");

class TermsService implements CRUD {

    async create() {
        return '';
    }

    getTerms() {
      return [{
        tittle: `TÉRMINOS Y CONDICIONES GENERALES`
      },
      {
        subtittle: `1. Condiciones Generales de Uso de la Billetera Inbank`,
        description: `En forma previa a la utilización de cualquier servicio o contenido ofrecido a través de la plataforma de billetera electrónica disponible en la aplicación móvil deben leerse completa y atentamente estos términos y condiciones que constituyen un contrato entre usted (en adelante, el 'Usuario') respecto del uso del servicio de la aplicación INBANK (en adelante, la 'App'). La utilización de la App como medio de pago de bienes y servicios, ofrecidos por los Comercios y Empresas adheridos al software de pagos, están sujetos al presente contrato que describen los derechos, responsabilidades y obligaciones del Usuario y de la App/Administradora.
          El Usuario debe leer, comprender y aceptar todos los términos y condiciones y demás políticas y principios incorporados a las mismas por referencias establecidas en este contrato, previo a su registro como Usuario de la App. A tales fines, se entenderá que, en cualquier caso, la utilización del Servicio implica la aceptación por parte del Usuario de los Términos y Condiciones de Uso, los cuales tiene un carácter obligatorio y vinculante.`
      },
      {
        subtittle: `2. Registro`,
        description: `Para utilizar INBANK, el Usuario debe;
        - Ser persona mayor de 18 años, con domicilio en la República Argentina.
        - Contar con un dispositivo móvil con acceso a Internet, que permita el ingreso a la plataforma INBANK.
        - Descargar la App desde las tiendas oficiales habilitadas.
        - Generar un perfil con una contraseña para acceder a la App (en adelante, la "Cuenta de Usuario").
        - Aceptar los Términos y Condiciones.
        Para disponer del servicio el Usuario deberá registrarse en la APP asociando sus datos personales, siguiendo los procedimientos que le indique el Sistema. El Usuario recibirá un mail que contendrá el código numérico de 6 dígitos para la activación del usuario en la app. La cuenta de Usuario es personal, única e intransferible, encontrándose prohibida su venta, cesión o transferencia a terceros. El Usuario no podrá permitir ni autorizar el uso de su cuenta a terceros.
        Los usuarios acuerdan no revelar o compartir su nombre de usuario y/o contraseña con ninguna persona. Los Usuarios serán responsables por todas las actividades que se produzcan en o a través de su cuenta, y deberán responder ante cualquier daño o perjuicio que el uso de su cuenta por parte de terceros no autorizados pudiera causar a INBANK o a cualquier tercero. INBANK no será responsable ante cualquier pérdida, gasto, daño y/o perjuicio ocasionado como consecuencia del incumplimiento de alguna de estas obligaciones por parte de los Usuarios.
        El Usuario se compromete a notificar a INBANK al email rdi@accionpoint.com en forma inmediata acerca de cualquier acceso y/o uso no autorizado que detecte en su cuenta.`,
      },
      {
        subtittle: `3.Funcionalidades`,
        description: `Billetera INBANK es una plataforma que permite al Usuario cargar saldo, pagar servicios, hacer transferencias de dinero entre usuarios, pagar en comercios adheridos extraer saldo, adquirir préstamos, pagar el préstamo adquirido.
        Límites: En cumplimiento de las políticas de prevención de lavado de activos y financiamiento del terrorismo, Billetera INBANK se reserva el derecho de imponer límites a sus transacciones, como por ejemplo a:
        - Los montos permitidos para realizar y recibir pagos a través de Billetera INBANK.
        - Los montos permitidos para cargar y extraer dinero de Billetera INBANK.
        - Los montos para realizar transferencias a CBU y CVU.
        - Los montos para realizar transferencias entre usuarios.
        En todo momento, y a su solo criterio, Billetera INBANK podrá aumentar o modificar los límites permitidos, así como también modificar o agregar criterios de límites.`,
      },
      {
        subtittle: `4. Consulta de movimientos:`,
        description: `A través de la Billetera INBANK, el Usuario podrá consultar los últimos movimientos realizados, como ver sus acreditaciones de saldo, sus pagos realizados y sus extracciones de saldo.`,
      },
      {
        subtittle: `5. Funcionamiento y uso de la Billetera INBANK :`,
        description: `INBANK se reserva el derecho a revisar, modificar, mejorar o interrumpir la Billetera y/o sus funcionalidades u operatoria cuando lo considere oportuno y sin previo aviso a los Usuarios.
        El acceso a la Billetera INBANK  podrá verse suspendido momentáneamente y sin previo aviso en el caso de un fallo del sistema, operaciones de mantenimiento, revisión o reparación o por otros motivos. INBANK no será responsable por cualquier perjuicio que la suspensión o interrupción de la Billetera INBANK pudiera ocasionar al Usuario.
        INBANK no estará obligada a proporcionar servicios de mantenimiento o de asistencia técnica a los Usuarios.
        El Usuario entiende y acepta que INBANK podrá dejar de proporcionar la Billetera INBANK y sus Servicios en cualquier momento.`
      },
      {
        subtittle: `6. Modificaciones`,
        description: `INBANK podrá, en cualquier momento y sin necesidad de previo aviso, realizar cambios y/o actualizaciones a los presentes Términos y Condiciones. Como consecuencia de lo anterior, el Usuario deberá revisar periódicamente si hay cambios en los Términos y Condiciones. La continuación en el uso de la Billetera INBANK por parte del Usuario implicará la total aceptación de los mismos. Cualquier Usuario que no esté de acuerdo con las actualizaciones o modificaciones de los Términos y Condiciones, deberá abstenerse de utilizar la Billetera INBANK.
        Asimismo, el Usuario entiende y acepta que la Billetera INBANK podrá ser administrada y operada en el futuro por una persona o entidad distinta de la actual, y que para dicha transferencia en la administración y operación de la Billetera INBANK, no será necesaria notificación fehaciente ni consentimiento previo o posterior por parte del Usuario, quien lo acepta de conformidad.`
      },
      {
        subtittle: `7. Contacto:`,
        description: `Para preguntas sobre los Términos y Condiciones, los Usuarios podrán contactarse a través de correo electrónico a la casilla rdi@accionpoint.com`
      },
      {
        subtittle: `8. Notificaciones:`,
        description: `El Usuario acepta expresamente que serán válidas todas las notificaciones dirigidas al número de línea celular informado por el Usuario y/o al correo electrónico denunciado al momento de registración.
        INBANK no será responsable por las conductas del Usuario derivadas o vinculadas con información contenida en mensajes o correos electrónicos falsos y/o que aparenten provenir de INBANK que sean enviados por terceros, ni será responsable por los daños, perjuicios, gastos y/o pérdidas que dichas conductas pudieran generar.`
      },
  
    ];
    }

    getRegulations() {
      return [{
      tittle: `Reglamento de Uso del InBank`
    },
    {
      subtittle: `1. Información provista por los Usuarios:`,
      description: `El Usuario declara y garantiza que todos los datos que ingrese a la  Billetera INBANK serán válidos, exactos, precisos y verdaderos, y se compromete a mantenerlos actualizados en todo momento.
        Los siguientes Datos Personales son recopilados a través de la Billetera INBANK: nombre, apellido, sexo, DNI, número de línea celular, correo electrónico, contraseña.
        INBANK no se responsabiliza por la veracidad, exactitud, integridad, vigencia, autenticidad y certeza de la información provista por los Usuarios.
        INBANK se reserva el derecho de solicitar comprobantes y/o información adicional a efectos de corroborar la información registrada por el Usuario, así como de suspender temporal o definitivamente a aquellos Usuarios cuyos datos no hayan podido ser confirmados.
        Asimismo, INBANK se reserva el derecho de rechazar una solicitud de registro o de cancelar o suspender, temporal o definitivamente una cuenta, en caso de detectar incongruencias o inconsistencias en la información provista por un Usuario, sin que tal decisión genere para el Usuario derechos de indemnización o resarcimiento.`
    },
    {
      subtittle: `2. Datos Personales - Política de Privacidad:`,
      description: `La utilización de la Billetera INBANK implicará la recolección y tratamiento por parte de INBANK de ciertos datos de los Usuarios de carácter personal, los que serán tratados por INBANK en todo momento de conformidad con lo dispuesto en la Ley de Protección de Datos Personales N° 25.326, su Decreto Reglamentario 1558/2001, y/o la que en el futuro la reemplace.
        A los fines de estos Términos y Condiciones, se entenderá por "Datos Personales" a toda información referida a los Usuarios que permita su identificación de manera directa o indirecta.
        Los Datos Personales que serán recopilados a través de la Billetera PAYMOVIL: nombre, apellido, sexo, DNI, número de línea celular, correo electrónico y contraseña.
        La recolección de los Datos Personales resulta imprescindible a los efectos de cumplir con las funcionalidades de la Billetera Virtual por lo que la abstención del Usuario a entregarlos o su solicitud de supresión impedirá el uso de la Billetera Virtual.
        El Usuario consiente que sus Datos Personales sean utilizados con fines promocionales, comerciales y/o publicitarios; en tal sentido INBANK podrá enviar comunicaciones, mensajes publicitarios y/o promocionales y/o cualquier contenido con fines de marketing.
        Sin perjuicio de lo anterior, los Datos Personales también podrán ser revelados a terceros en caso que existiera una obligación legal de hacerlo y/o en virtud de una orden emanada de autoridad judicial o administrativa competente.
        Los Datos Personales recolectados por INBANK  a través de la Billetera serán almacenados en una base de datos de su titularidad debidamente registrada ante la Agencia de Acceso a la Información Pública.
        INBANK  adoptará las medidas de seguridad y preservación de la información exigidas por la normativa vigente (incluyendo aquéllas contenidas en la Resolución 47/2018 de la Agencia de Acceso a la Información Pública) a fin de garantizar un nivel adecuado de seguridad que permita evitar su adulteración, pérdida, consulta o tratamiento no autorizado, y que permitan detectar desviaciones, intencionales o no, de información. No obstante, lo anterior, el Usuario reconoce que incluso las medidas más avanzadas no resultan infalibles, por lo que entiende y acepta que INBANK  no puede garantizar la seguridad absoluta de la información, asumiendo el Usuario el riesgo correspondiente.`
    },
    {
      subtittle: `3. Propiedad Intelectual y/o Industrial:`,
      description: `El Usuario reconoce y acepta que la Billetera INBANK  y todo su contenido, incluyendo sin limitación software, códigos, textos, gráficos, imágenes, estructura, información, diseño, marcas, logos, nombres comerciales y/o cualquier otro signo distintivo, son de propiedad exclusiva de y se encuentran protegidos bajo las leyes de propiedad intelectual y/o industrial y/o cualquier otro derecho que pudiera resultar de aplicación.De ningún modo podrá interpretarse que la descarga, acceso y/o uso de la Billetera INBANK  le atribuyen al Usuario ningún derecho sobre los mismos, más allá de lo expresamente previsto en los presentes Términos y Condiciones.`
    },
    {
      subtittle: `4. Responsabilidad:`,
      description: `Sin perjuicio de que INBANK hará sus mejores esfuerzos para que ello no suceda, dada la naturaleza propia de internet y los sistemas informáticos en general -los que pueden resultar vulnerables-, los Usuarios entienden y aceptan que INBANK no garantiza que la Billetera INBANK se encuentre libre de vicios, errores o defectos, ni tampoco que la misma sea útil para un resultado o fin específico, no asumiendo INBANK ningún tipo de responsabilidad en éste sentido y utilizando el Usuario la Billetera INBANK y sus servicios bajo su propio y exclusivo riesgo. INBANK no será responsable por cualquier daño, perjuicio, gasto y/o pérdida derivado directa o indirectamente del uso de la Billetera INBANK.
        INBANK no será responsable por las demoras, interrupciones o deficiencias en la Billetera INBANK ocasionadas por el servicio de internet y/o de telefonía móvil utilizado por el Usuario y/o cualquier otro factor externo.
        El Usuario entiende y acepta que la descarga, acceso y uso de la Billetera INBANK no implica la obligación por parte de INBANK de controlar la ausencia de virus o cualquier otro elemento informático dañino, y que corresponderá al Usuario la implementación de herramientas adecuadas para la detección y desinfección de programas informáticos dañinos, no siendo INBANK responsable por los daños, perjuicios, gastos o pérdidas que la falta de aplicación de los mismos pudiera ocasionar.
        INBANK no será responsable por el software de terceros que interactúan con la Billetera INBANK o que utilice el Usuario, provistos por el fabricante del dispositivo móvil utilizado o por cualquier tercero.`
    },
    {
      subtittle: `5. Jurisdicción y ley aplicable:`,
      description: `Las cuestiones relativas a los presentes Términos y Condiciones y al tratamiento de Datos Personales, así como todas aquellas cuestiones que radican y tengan relación en parte o en su totalidad con los servicios suministrados a través de la Billetera INBANK, se rigen en todos y cada uno de sus extremos por la ley argentina, sometiéndose las partes a los Juzgados y Tribunales ordinarios con asiento en la Ciudad de Buenos Aires.`
    }];
    }

}

export default new TermsService();
