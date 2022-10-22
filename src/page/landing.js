import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth, firebaseDb } from '../firebase';
import { getDocs, collection, doc, setDoc } from "firebase/firestore";







function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Med-U
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme({
    palette: {
      primary: {
        main: '#59981A',
      },
      lime: {
        main: '#81B622',
      },
      olive: {
        main: '#3D550C',
      },
      yellow: {
        main: '#ECF87F',
      },
    },
  });

export default function Album() {
    const navigate = useNavigate()
    const [listHospital, setListHospital] = React.useState([]);
    const [isLogin, setIsLogin] = React.useState(false);

   React.useEffect(()=> {
    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setIsLogin(true)
          // ...
        } else {
          // User is signed out
          // ...
          setIsLogin(false)
        }
      });

      async function getCities(db) {
        const citiesCol = collection(db, 'hospital');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        return cityList;
      }
      
      getCities(firebaseDb).then(value=>{setListHospital(value)});
      // addData();
   }, [])

   const handleLogout = () => {
    signOut(firebaseAuth).then(() => {
        // Sign-out successful.
        navigate('/login')
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });
   }

   const addData = () => {
      const hospitalData = {
        name:"RS Merakyat",
        Address:"Jl Tomcat",
        Country:"Symbiot",
        Description:"Good hospital",

      }
      const cityRef = doc(firebaseDb, 'hospital', "RSM");
      setDoc(cityRef, hospitalData, { merge: true });
   }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" color="lime" sx={{display: "flex"}}>
        <Toolbar>
          <HealthAndSafetyIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit">
           MedU
          </Typography>
          <Box sx={{ml: '70%', display: 'flex', width: '20%'}}>
            {
                isLogin? <Button onClick={handleLogout} variant="contained" sx={{height: '10%'}}>Logout</Button>
                :
                
                <Box sx={{display: 'flex', width: '100%'}}>
                    <Button onClick={() => navigate('/login')} variant="contained" >Login</Button>
                    <Button onClick={() => navigate('/register')} variant="contained" sx={{ml: '10%', height: '37px'}}><Typography>Sign Up</Typography></Button>
                </Box>
            }
            
          </Box>
          
        </Toolbar>
        
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              MedU App
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Track Your Medical Health Journey
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Medical History</Button>
              <Button variant="outlined">Your Profile</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {listHospital.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography sx={{marginBottom: "20px", fontSize: "12px"}}>
                      {card.Country}, {card.Address}
                    </Typography>
                    <Typography>
                      {card.Description.substring(0,50)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}