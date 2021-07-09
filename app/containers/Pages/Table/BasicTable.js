import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, EmptyData } from 'dan-components';
import StrippedTable from './StrippedTable';
import { CrudTable, Notification } from 'dan-components';
// import List from '../Users/List';

class BasicTable extends Component {
    render() {
        const title = brand.name + ' - Table';
        const description = brand.desc;
        return (
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="twitter:title" content={title} />
                    <meta
                        property="twitter:description"
                        content={description}
                    />
                </Helmet>
                <PapperBlock
                    title="Table"
                    whiteBg
                    icon="ios-menu-outline"
                    desc="User table"
                >
                    <div>
                        <StrippedTable />
                    </div>
                </PapperBlock>
            </div>
        );
    }
}

export default BasicTable;
