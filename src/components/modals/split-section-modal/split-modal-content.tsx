// import React from 'react';
// import SplitIcon from '@material-ui/icons/CallSplit';
// import { Typography, FormControl, Input, FormHelperText, Button } from '@material-ui/core';
// import { ModalContentProps } from '..';
// import { useModalStyles } from '../styles';
// import Box from 'components/box';
// import { withRouter } from 'react-router';


// const SplitModalContent: React.FC<ModalContentProps> = ({ onClose }) => {

//     const formStyles = useModalStyles();

//     const SubmitButton = withRouter(({ history }) => (
//         <Button
//             onClick={handleSubmit(history)}
//             className={formStyles.confirmBtn}
//             color="secondary"
//             variant="contained"
//             disabled={!name.length || Boolean(errorOnName.length)}
//         >Continue</Button>
//     ));

//     return (
//         <Box column>
//             <Box className={formStyles.header} align="center">
//                 <SplitIcon color="inherit"/>
//                 <Typography
//                     className={formStyles.subtitle}
//                     color="inherit"
//                     variant="subtitle1">Merge Sections</Typography>
//             </Box>

//             <FormControl
//                 error={Boolean(errorOnName.length)}>


//                 <Input
//                     className={formStyles.input}
//                     classes={{
//                         input: formStyles.input,
//                         focused: formStyles.inputFocused
//                     }}
//                     disableUnderline
//                     id="new-section-name"
//                     placeholder="Enter new section name"
//                     value={name}
//                     onChange={setValueFromEvent(setName)}
//                     onBlur={handleValidateSection}
//                     onFocus={() => setNameError('')}
//                 />
//                 <FormHelperText id="component-error-text">{errorOnName}</FormHelperText>
//             </FormControl>

//             <Box align="center" justify="end">
//                 <Button onClick={onClose}>Cancel</Button>
//                 <SubmitButton />
//             </Box>
//         </Box>
//     );
// };

// export default SplitModalContent;
