import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    margin: '8px',
    '&.date': {
      color: "#0000009e"
    },
    '&.status': {
      marginBottom: '28px',
      color: "#8F9297"
    },
  }));