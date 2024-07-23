import React, { useEffect } from 'react';
import { Container, Header, Button, Icon, Grid, Image, Menu } from 'semantic-ui-react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { motion } from 'framer-motion';
import 'semantic-ui-css/semantic.min.css';

const App = () => {

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <Container>
          <Menu secondary>
            <Menu.Item name='logo' style={styles.logo}>
              Interact
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item>
                <ScrollLink to="features" smooth={true} duration={500}>
                  <Button primary style={styles.buttonWithLine}>Features</Button>
                </ScrollLink>
              </Menu.Item>
              <Menu.Item>
                <ScrollLink to="about" smooth={true} duration={500}>
                  <Button style={styles.buttonWithLine}>About Us</Button>
                </ScrollLink>
              </Menu.Item>
              <Menu.Item>
                <ScrollLink to="contact" smooth={true} duration={500}>
                  <Button style={styles.buttonWithLine}>Contact</Button>
                </ScrollLink>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
      </header>

      <Container textAlign='center' style={styles.hero}>
        <div style={styles.heroContent}>
          <Header as='h1' style={styles.heroHeader}>Welcome to Interact</Header>
          <Image src='hero.png' style={styles.heroImage} />
        </div>
      </Container>

      <Container id='features' style={styles.section}>
        <Header as='h2' textAlign='center' style={styles.sectionHeader}>Features</Header>
        <Grid columns={3} stackable>
          <Grid.Row>
            <Grid.Column>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={styles.featureItem}
              >
                <Icon name='cogs' size='huge' />
                <Header as='h3'>Feature One</Header>
                <p>Detail about feature one.</p>
              </motion.div>
            </Grid.Column>
            <Grid.Column>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={styles.featureItem}
              >
                <Icon name='chart line' size='huge' />
                <Header as='h3'>Feature Two</Header>
                <p>Detail about feature two.</p>
              </motion.div>
            </Grid.Column>
            <Grid.Column>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={styles.featureItem}
              >
                <Icon name='mobile alternate' size='huge' />
                <Header as='h3'>Feature Three</Header>
                <p>Detail about feature three.</p>
              </motion.div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      <Container id='about' style={styles.section}>
        <Header as='h2' textAlign='center' style={styles.sectionHeader}>About Us</Header>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
              <Image src='about.jpg' style={styles.aboutImage} />
            </Grid.Column>
            <Grid.Column>
              <p>Information about your company. This should give a detailed overview of what the company is about, its mission, values, and history. It should be engaging and informative.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      <footer style={styles.footer} id='contact'>
        <Container textAlign='center'>
          <a href='https://www.facebook.com' style={styles.socialIcon}><FaFacebookF /></a>
          <a href='https://www.twitter.com' style={styles.socialIcon}><FaTwitter /></a>
          <a href='https://www.instagram.com' style={styles.socialIcon}><FaInstagram /></a>
          <p>&copy; 2024 Interact. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    width: '100%',
  },
  header: {
    padding: '1em 0',
    backgroundColor: '#f9f9f9',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  buttonWithLine: {
    position: 'relative',
    transition: 'transform 0.3s ease',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      display: 'block',
      width: '100%',
      height: '2px',
      backgroundColor: 'currentColor',
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      transform: 'scaleX(0)',
      transition: 'transform 0.3s ease',
    },
    '&:hover::after': {
      transform: 'scaleX(1)',
    },
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  hero: {
    position: 'relative',
    textAlign: 'center',
    color: 'white',
    padding: 0,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
  },
  heroHeader: {
    fontSize: '3em',
    marginBottom: '1em',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  },
  heroImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
    zIndex: -1,
  },
  section: {
    padding: '4em 0',
  },
  sectionHeader: {
    marginBottom: '1em',
  },
  featureItem: {
    textAlign: 'center',
    padding: '2em',
    transition: 'transform 0.3s ease',
  },
  aboutImage: {
    width: '100%',
    height: 'auto',
  },
  footer: {
    padding: '2em 0',
    backgroundColor: '#333',
    color: '#fff',
  },
  socialIcon: {
    margin: '0 0.5em',
    color: '#fff',
    fontSize: '1.5em',
  }
};

export default App;
