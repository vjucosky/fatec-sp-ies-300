import React, { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { Container, Typography, IconButton, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Box, Tabs, Tab } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

import ThemeDialog from '../../components/ThemeDialog';
import DeleteDialog from '../../components/DeleteDialog';
import { database } from '../../utils/settings/firebase';

function SettingsPage({ themes }) {
    const [tabState, setTabState] = useState({ index: 0 });
    const [themeDialogContent, setThemeDialogContent] = useState({ name: '', code: '', description: '', price: null, open: false });
    const [deleteDialogContent, setDeleteDialogContent] = useState({ name: '', onDelete: undefined, open: false });

    function deleteTheme(id) {
        deleteDoc(doc(database, 'themes', id));
    };

    return (
        <>
            <Container maxWidth='md' style={{ marginTop: 64, marginBottom: 64 }}>
                <Typography gutterBottom variant='h4'>
                    Configurações
                </Typography>
                <Box>
                    <Tabs value={tabState.index} onChange={(event, value) => setTabState({ ...tabState, index: value })}>
                        <Tab label='Temas' />
                        <Tab label='Sobre' />
                    </Tabs>
                    {tabState.index === 0 &&
                        <>
                            <TableContainer component={Paper} style={{ marginTop: 24 }}>
                                <Typography gutterBottom variant='h6' style={{ margin: 16 }}>
                                    Temas
                                </Typography>
                                <Typography gutterBottom style={{ margin: 16 }}>
                                    O nome e a cor dos temas não podem ser editados, pois são itens comercializados aos usuários da plataforma. Excluir um tema não o remove dos usuários que o adquiriram.
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Nome
                                            </TableCell>
                                            <TableCell>
                                                Cor de destaque
                                            </TableCell>
                                            <TableCell>
                                                Preço
                                            </TableCell>
                                            <TableCell>
                                                Ações
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {themes.map(theme => {
                                            return (
                                                <TableRow>
                                                    <TableCell>
                                                        {theme.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {theme.code}
                                                    </TableCell>
                                                    <TableCell>
                                                        R${theme.price.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton size='small' variant='contained' color='primary' onClick={() => setThemeDialogContent({ ...theme, code: theme.code.substring(1), open: true })} style={{ marginRight: 4 }}>
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton size='small' variant='contained' color='secondary' onClick={() => setDeleteDialogContent({ name: theme.name, onDelete: () => deleteTheme(theme.id), open: true })}>
                                                            <Delete />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button variant='contained' color='primary' onClick={() => setThemeDialogContent({ name: '', code: '', description: '', price: null, open: true })} style={{ marginTop: 16 }}>
                                Novo tema
                            </Button>
                        </>
                    }
                    {tabState.index === 1 &&
                        <>
                            <Typography gutterBottom variant='h6' style={{ marginTop: 24 }}>
                                Sobre o desenvolvedor
                            </Typography>
                            <Typography gutterBottom>
                                Em desenvolvimento.
                            </Typography>
                        </>
                    }
                </Box>
            </Container>
            <ThemeDialog
                dialogContent={themeDialogContent}
                setDialogContent={setThemeDialogContent}
            />
            <DeleteDialog
                dialogContent={deleteDialogContent}
                setDialogContent={setDeleteDialogContent}
            />
        </>
    );
};

export default SettingsPage;
