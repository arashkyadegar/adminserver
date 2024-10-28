const corsOptions = {
  origin: ['https://arashkyadegar.ir',
    'http://arashkyadegar.ir',
    'https://www.arashkyadegar.ir',
    'http://www.arashkyadegar.ir',
    'https://adminapp.arashkyadegar.ir',
    'http://adminapp.arashkyadegar.ir',
    'http://localhost:3000'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200 // For legacy browser support
};

export default corsOptions;